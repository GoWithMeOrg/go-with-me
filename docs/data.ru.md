# Хранение данных

## Текстовые данные
События (Events), Комментарии (Comments), Уведомления (Notifications), Места (Location) и так далее — все это текстовые данные.

Есть два способа хранения данных — в виде таблиц или в виде документов.
Таблицы и их связи — это реляционная модель данных ([РМД](https://ru.wikipedia.org/wiki/Реляционная_модель_данных), а документы — [документоориентированная модель данных](https://ru.wikipedia.org/wiki/Документоориентированная_СУБД).

### Рассмотрим хранение событий, Events
Каждое событие содержит в себе следующие данные:
- `id` — уникальный идентификатор события 
- `organizer_id` - идентификатор пользователя, который создал событие
- `tripName` - название события
- `description` - описание события
- `isPrivate` - является ли событие доступным для всех пользователей
- `startDate` - дата начала события
- `endDate` - дата окончания события

#### Реляционная модель данных

В реляционной модели данных, это будет выглядеть следующим образом:

**Events** таблица:

| id | organizer_id | tripName      | description            | isPrivate | startDate  | endDate    |
|----|-------------|---------------|------------------------|-----------|------------|------------|
| 1  | 1           | Велопокатушки | Мы поедем, мы помчимся | 0         | 2024-01-01 | 2024-01-10 |
| 2  | 2           | Поход в горы  | Поедем в горы          | 1         | 2024-01-11 | 2024-01-13 |
и так далее.

Организитор_ка события (`organizer_id`) — это внешний ключ (foreign key) на таблицу пользователей (Users).

**Users** таблица:

| id | name  | email            | image                   |
|----|-------|------------------|-------------------------|
| 1  | Анна  | anna@example.com | link_to_avatar_anna.jpg |
| 2  | Петр  | pert@example.com | link_to_avatar_pert.jpg |


Зачем две таблицы вместо одной?
Чтобы не дублировать данные. Если бы в таблице `Events` были поля `organizerName`, `organizerEmail`, `organizerImage`, 
то пришлось бы их заполнять каждый раз, когда пользователь создает событие. 
А если пользователь решит поменять свое имя, то придется обновлять все события,
которые он создал. Вместо этого, мы храним только идентификатор пользователя, а имя, email и изображение берем из таблицы `Users`.
Для получения данных о пользователе, который создал событие, 
нам нужно сделать `JOIN` таблиц `Events` и `Users` по полю `organizer_id`.

Пример запроса:
```sql
SELECT * FROM Events
JOIN Users ON Events.organizer_id = Users.id
WHERE Events.id = 1
```

#### Документоориентированная модель данных

https://www.mongodb.com/docs/manual/core/data-model-design/
В документоориентированной модели данных, это будет выглядеть следующим образом:

Коллекции `User` и `Event`:

Модель mongoose:
```js
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

const EventSchema = new Schema({
  // Для связи с другой коллекцией используем тип Schema.Types.ObjectId и ref на модель
  organizer_id: { type: Schema.Types.ObjectId, ref: 'User' },
  tripName: { type: String, required: true },
  description: { type: String, required: true },
  isPrivate: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})
  
// Для получения данных о пользователе, который создал событие,
// нам нужно сделать populate по полю `organizer`, см пример ниже
EventSchema.virtual('organizer', {
  ref: UserModel,
  localField: 'organizer_id',
  foreignField: '_id',
  justOne: true,
})

const Event = mongoose.model('Event', EventSchema)

```

```js
const events = [
  {
    "id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7a"),
    "organizer_id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7b"),
    "tripName": "Велопокатушки",
    "description": "Мы поедем, мы помчимся",
    "isPrivate": false,
    "startDate": "2024-01-01",
    "endDate": "2024-01-10"
  },
  {
    "id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7c"),
    "organizer_id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7d"),
    "tripName": "Поход в горы",
    "description": "Поедем в горы",
    "isPrivate": true,
    "startDate": "2024-01-11",
    "endDate": "2024-01-13"
  }
]
```
Пользователей храним в коллекции `Users`:

```js
const users = [
  {
    "id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7b"),
    "name": "Анна",
    "email": "anna@example.com",
    "image": "link_to_avatar_anna.jpg"
  },
  {
    "id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7d"),
    "name": "Петр",
    "email": "pert@example.com",
    "image": "link_to_avatar_pert.jpg"
  }
]
```

Пример запроса событий с пользователем, который их создал:
https://mongoosejs.com/docs/populate.html

```js
const events = await Event.find().populate('organizer');
```

В Mongo без mongoose это будет выглядеть так:
https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup

```js
const events = db.events.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "organizer_id",
      foreignField: "_id",
      as: "organizer",
    },
  },
]);
```

## Примеры

Рассмотрим пример создания API данных для комментариев (Comments).

Комментарий содержит в себе следующие данные:
- `_id` — уникальный идентификатор
- `author_id` - идентификатор пользователя, который создал комментарий
- `event_id` - идентификатор события, к которому относится комментарий
- `content` - текст комментария
- `createdAt` - дата создания
- `updatedAt` - дата обновления

### Создание модели данных для комментариев (Comments)
В папке `src/database/models` создаем файл `Comment.ts` со следующим содержимым:

```ts
import mongoose, { Schema, Document } from 'mongoose'
// импортируем модель пользователя, нужно для создания связи
// с пользователем для показа имени и аватарки
import UserModel from './User'

// Создаем тип для комментария
// Будет использоваться на стороне клиента (в React)
export interface IComment {
  author_id: mongoose.Types.ObjectId;
  event_id: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Создаем тип для схемы
// Будет использоваться на стороне сервера (в Node.js)
// содержит в себе API Document из mongoose
// @see https://mongoosejs.com/docs/api/document.html
export interface ICommentDocument extends Omit<IComment, '_id' | 'createdAt' | 'updatedAt'>, Document {}

// Создаем схему для комментария
const CommentSchema = new Schema<ICommentDocument>({
  author_id: { type: Schema.Types.ObjectId, ref: UserModel },
  event_id: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true }, 
}, 
{
  timestamps: true,
})
  
// Добавляем виртуальное поле для получения данных о пользователе, который создал комментарий
CommentSchema.virtual('author', {
  ref: UserModel,
  localField: 'author_id',
  foreignField: '_id',
  justOne: true,
})

// Создаем модель комментария
// проверка mongoose.models.Comment нужна для того, чтобы не создавать модель повторно в dev режиме в hot reload
const CommentModel:mongoose.Model<ICommentDocument> = mongoose.models.Comment || mongoose.model<ICommentDocument>('Comment', CommentSchema)

export default CommentModel
```


### Создание API для комментариев (Comments)
REST API в NextJS это Route Handlers, см https://nextjs.org/docs/app/building-your-application/routing/route-handlers
В папке `src/app/api` создаем папку `comments` и файл `route.ts` со следующим содержимым:

```ts
import { NextRequest, NextResponse } from 'next/server'
import mongooseConnect from '@/database/mongooseConnect'
import CommentModel from '@/database/models/Comment'

// Чтение комментариев
// Коммментарии будут искаться по идентификатору события, к которому они относятся
// GET /api/comments?event_id=5f8b1d8f0b9c2e1b1c9d4c7a
export async function GET (request: NextRequest) {
  const { event_id } = request.query

  // Подключаемся к базе данных
  await mongooseConnect()

  // Получаем ID пользователя из сессии
  const currentSessionUserId = await getUserId(request)

  // Необходимо проверить, что пользователь авторизован
  if (!currentSessionUserId) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      {
        status: 403,
        statusText: 'User not found',
      },
    )
  }

  // Ищем комментарии по идентификатору события
  // и добавляем данные о пользователе, который создал комментарий через populate
  const comments = await CommentModel.find({ event_id }).populate('author')

  // Возвращаем комментарии
  return NextResponse.json({
    data: comments,
    error: null,
  })
}

// Создание комментария
// POST /api/comments
export async function POST (request: NextRequest) {
  // Подключаемся к базе данных
  await mongooseConnect()

  // Получаем ID пользователя из сессии
  const currentSessionUserId = await getUserId(request)

  // Необходимо проверить, что пользователь авторизован
  if (!currentSessionUserId) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      {
        status: 403,
        statusText: 'User not found',
      },
    )
  }

  // Получаем данные из тела запроса
  const { event_id, content } = await request.body.json()

  // Создаем комментарий
  const comment = await CommentModel.create({
    author_id: currentSessionUserId,
    event_id,
    content,
  })

  // Сохраняем комментарий
  await comment.save()

  // Возвращаем комментарий
  return NextResponse.json({
    data: comment,
    error: null,
  })
}


// Удаление комментария
// DELETE /api/comments/[id]
// Будет реализовано в файле src/app/api/comments/[id]/route.ts

// Обновление комментария
// PATCH /api/comments/[id]
// Будет реализовано в файле src/app/api/comments/[id]/route.ts
```

В папке `src/app/api/comments` создаем папку `[id]` и файл `route.ts` со следующим содержимым:

```ts
import { NextRequest, NextResponse } from 'next/server'
import mongooseConnect from '@/database/mongooseConnect'
import CommentModel from '@/database/models/Comment'

// Удаление комментария
// DELETE /api/comments/[id]
export async function DELETE (request: NextRequest) {
  // Подключаемся к базе данных
  await mongooseConnect()

  // Получаем ID пользователя из сессии
  const currentSessionUserId = await getUserId(request)

  // Необходимо проверить, что пользователь авторизован
  if (!currentSessionUserId) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      {
        status: 403,
        statusText: 'User not found',
      },
    )
  }

  // Получаем ID комментария из URL
  const { id } = request.params
  // или так
  // export async function DELETE (request: NextRequest, context: { params: { id: string } }) {}
  // TODO проверить в докуметации способ получения id

  // Удаляем комментарий
  const result = await CommentModel.deleteOne({ _id: id })

  return NextResponse.json({
    data: result,
    error: null,
  })

}

// Обновление комментария
// PATCH /api/comments/[id]
export async function PATCH (request: NextRequest, context: { params: { id: string } }) {
  // Подключаемся к базе данных
  await mongooseConnect()

  // Получаем ID пользователя из сессии
  const currentSessionUserId = await getUserId(request)

  // Необходимо проверить, что пользователь авторизован
  if (!currentSessionUserId) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      {
        status: 403,
        statusText: 'User not found',
      },
    )
  }

  // Получаем данные из тела запроса
  const { content } = await request.body.json()

  // Обновляем комментарий
  const result = await CommentModel.updateOne({ _id: id }, { content })

  return NextResponse.json({
    data: result,
    error: null,
  })

}
```



## Бинарные данные
Изображения, аудио, видео и тд.

// TODO: дописать
