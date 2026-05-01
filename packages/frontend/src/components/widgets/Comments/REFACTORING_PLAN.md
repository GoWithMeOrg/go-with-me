# 📋 План рефакторинга Comments Widget

## 🎯 Обзор архитектуры

```
Comments/
├── Comments.tsx          # Контейнер (root)
├── Comment/
│   ├── Comment.tsx       # Рекурсивный компонент комментария
│   ├── Comment.module.css
│   └── hooks/
│       ├── useParrentComments.ts   # Родительские комментарии
│       └── useChildrenComments.ts  # Ответы/реплики
├── CommentForm/
│   ├── CommentForm.tsx
│   └── CommentForm.module.css
└── types.ts
```

---

## 🔥 Критические проблемы

### 1. Comment.tsx — смешанная логика и дублирование

**Проблемы:**
- Код `deleted` и `!deleted` ветки дублируются
- `Math.min(depth + 1, 1)` — магия, которая не читается
- `replyToState` управляет UI, а не данные
- JSX вложенность > 5 уровней в norm-ветке

**Решение:**
```typescript
// Было:
if (comment.deleted) return <DeletedComment />
return <CommentWithReplies />

// Станет:
const RenderComment = () => <div>...</div>
const RenderDeletedComment = () => <div>...</div>

return comment.deleted ? (
  <RenderDeletedComment />
) : (
  <RenderComment />
)
```

**Приоритет:** 🔴 **HIGH** (30 мин)

---

### 2. useChildrenComments.ts — загрязнённый state

**Проблемы:**
| Проблема | Строка |
|----------|--------|
| `console.log` | 36 |
| `totalCount` инкремент через `prev + 1` — race | 53 |
| UI state `replyToState` в хуке данных | 14, 86 |
| `loading` — OR-логика вместо Apollo combined | 92 |

**Решение:**

1. **Удалить console.log**
2. **Использовать Apollo combined loading:**
   ```typescript
   const { loading } = useQuery(..., { 
     fetchPolicy: 'cache-first' 
   });
   const { loading: mutationLoading } = useMutation(...);
   const loading = mutationLoading || loading;
   ```
3. **Вынести `replyToState` в `useReplyFormState`**
4. **Оптимистичный паттерн для totalCount:**
   ```typescript
   const [createReply] = useMutation(..., {
     optimisticResponse: {
       __typename: 'Mutation',
       createReply: {
         __typename: 'Comment',
         content: content,
         author: currentAuthor,
         createdAt: now(),
         repliesCount: 0
       }
     }
   });
   ```

**Приоритет:** 🟡 **MEDIUM** (1 час)

---

### 3. useParrentComments.ts — fetchPolicy проблемы

**Проблемы:**
- `fetchPolicy: 'network-only'` — каждый ререндер делает запрос
- `parentCommentsLoading` дублируется в Comments.tsx (строки 16, 36)
- Abort handling через флаг — устарело

**Решение:**
```typescript
const [fetchComments, { loading }] = useLazyQuery(..., {
  fetchPolicy: 'cache-first',
  nextFetchPolicy: 'cache-and-network',
  staleTime: 5000,
});

// Удалить дублирование в Comments.tsx
```

**Приоритет:** 🟡 **MEDIUM** (30 мин)

---

### 4. CommentForm.tsx — устаревший react-hook-form

**Проблемы:**
```typescript
// Было (устаревший):
const { field } = useController({ ... });

// Станет (современный):
const { field } = useField({ name: 'comment', control, rules: {...} });
```

**Приоритет:** 🟢 **LOW** (15 мин)

---

### 5. CSS классы

**Проблемы:**
- `buttonText` не описывает назначение
- Duplicated hover состояния

**Решение:**
```css
/* Было */
.buttonText:hover { color: var(--main-color); }

/* Станет */
.comments-list-load-more:hover { color: var(--main-color); }
```

**Приоритет:** 🟢 **LOW** (15 мин)

---

### 6. Comments.tsx — дублирование state

**Проблемы:**
```typescript
const { loading: parentCommentsLoading } = useParrentComments(event_id);

return (
  <>
    {(parentCommentsLoading || parentCommentsLoading) && ...} // ДУБЛЬ
    {hasMore && <Button ... />}
  </>
);
```

**Решение:**
```typescript
return (
  <>
    {parentCommentsLoading && <Spinner />}
    {hasMore && <Button onClick={loadMore}>LOAD MORE</Button>}
  </>
);
```

**Приоритет:** 🟢 **LOW** (5 мин)

---

## 📋 Детальный план работ

### 🟢 ЭТАП 0: Быстрые победы (25 мин)

- [x] Убрать дублирование `parentCommentsLoading` в Comments.tsx
- [ ] Убрать `console.log` в useChildrenComments
- [ ] Переименовать `buttonText` → `loadMoreButton` в CSS
- [ ] Добавить типы в `onClose?: () => void`

**Результат:** +300 строк читаемости

---

### 🟡 ЭТАП 1: Apollo optimization (45 мин)

- [ ] Заменить `network-only` на `cache-first` в обоих хуках
- [ ] Объединить `loading` состояния через Apollo
- [ ] Добавить `optimisticResponse` для мутаций
- [ ] Убрать manual `totalCount` increment

**Результат:** Меньше latency, оптимистичные UI updates

---

### 🟠 ЭТАП 2: Разделение UI/Data state (45 мин)

**Создать новые хуки:**
- [ ] `useReplyFormState()` — управляет открытым/закрытым модом
- [ ] `useCommentDeletion()` — обработка ошибок удаления
- [ ] Вынести `replyToState` из `useChildrenComments`

**Переписать хуки:**
```typescript
// Было:
export const useChildrenComments = (comment) => {
  // ... data + UI state
}

// Станет:
export const useChildrenComments = (comment) => {
  // ... только data
};

export const useReplyFormState = () => {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, setIsOpen, ... };
};
```

**Приоритет:** 🔴 HIGH — фундаментальная проблема архитектуры

---

### 🔴 ЭТАП 3: Refactor Comment.tsx (30 мин)

- [ ] Вынести `renderDeleted()`
- [ ] Вынести `renderNormal()`
- [ ] Заменить `Math.min(depth + 1, 1)` на константу
- [ ] Добавить JSDoc тип для `depth: 0 | 1`

**До:**
```typescript
depth?: number; // 0 = корневой, 1+ = ответ
...
depth={Math.min(depth + 1, 1)}
```

**После:**
```typescript
interface CommentProps {
  comment: CommentType;
  isRoot?: boolean; // false = ответ, true = корневой
  onDelete?: (id: string) => void;
}

const REPLY_LEVEL = 1; // const

// ...
depth={isRoot ? 0 : REPLY_LEVEL}
```

**Приоритет:** 🔴 HIGH — дублирование кода

---

### 🟢 ЭТАП 4: Стилизация (15 мин)

- [ ] Переименовать `buttonText` → `loadMoreButton`
- [ ] Добавить utility class для `.replies` отступа
- [ ] Убрать дублирующиеся `:hover` состояния

---

### 🟢 ЭТАП 5: Types (15 мин)

- [ ] Добавить типы в `types.ts` (если используются)
- [ ] Экспортировать типы явно из `index.ts`
- [ ] Добавить JSDoc типы для всех props

---

## 📊 Итого

| Этап | Время | Приоритет |
|------|-------|-----------|
| Быстрые победы | 25 мин | 🟢 |
| Apollo | 45 мин | 🟡 |
| UI/Data split | 45 мин | 🔴 |
| Comment refactoring | 30 мин | 🔴 |
| CSS | 15 мин | 🟢 |
| Types | 15 мин | 🟢 |
| **ВСЕГО** | **~2.5 часа** | |

---

## 🧪 Тестирование (30 мин отдельно)

После каждого этапа:
- [ ] Проверить рендер deleted комментариев
- [ ] Проверить loadMore pagination
- [ ] Проверить optimistic updates
- [ ] Проверить error handling
- [ ] Проверить reply form toggle
- [ ] Проверить race conditions при быстрой откатке

---

## 📈 Ongoing задачи

| Задача | Статус |
|--------|--------|
| Удалить `console.log` | ✅ |
| Заменить `network-only` | 🔄 |
| Разделить UI/Data state | 🔄 |
| Упростить Comment.tsx | ⏳ |

---

## 💡 Дополнительно

### Возможные улучшения (позже):

1. **Virtualize списки** если комментариев > 100
2. **Suspense boundaries** для асинхронных данных
3. **Error boundary** для Comments widget
4. **React Query** вместо Apollo (если нужно)
5. **Зависимость от глубины** в Comments (не только 2 уровня)

---

## 📝 Чеклист перед merge

- [ ] Нет дублирования JSX
- [ ] Нет `console.log`
- [ ] Нет магии (magic numbers)
- [ ] Типизированы все props
- [ ] Loading states корректны
- [ ] Error handling работает
- [ ] CSS class names описывают назначение
- [ ] Нет UI state в хуках данных
