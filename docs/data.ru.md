# Хранение данных

## Текстовые данные
События (Events), Комментарии (Comments), Уведомления (Notifications), Места (Location) и так далее — все это текстовые данные.

Есть два способа хранения данных — в виде таблиц или в виде документов.
Таблицы и их связи — это реляционная модель данных ([РМД](https://ru.wikipedia.org/wiki/Реляционная_модель_данных), а документы — [документоориентированная модель данных](https://ru.wikipedia.org/wiki/Документоориентированная_СУБД).

### Рассмотрим хранение событий, Events
Каждое событие содержит в себе следующие данные:
- `id` — уникальный идентификатор события 
- `organizerId` - идентификатор пользователя, который создал событие
- `tripName` - название события
- `description` - описание события
- `isPrivate` - является ли событие доступным для всех пользователей
- `startDate` - дата начала события
- `endDate` - дата окончания события

#### Реляционная модель данных

В реляционной модели данных, это будет выглядеть следующим образом:

**Events** таблица:

| id | organizerId | tripName      | description            | isPrivate | startDate  | endDate    |
|----|-------------|---------------|------------------------|-----------|------------|------------|
| 1  | 1           | Велопокатушки | Мы поедем, мы помчимся | 0         | 2024-01-01 | 2024-01-10 |
| 2  | 2           | Поход в горы  | Поедем в горы          | 1         | 2024-01-11 | 2024-01-13 |
и так далее.

Организитор_ка события (`organizerId`) — это внешний ключ (foreign key) на таблицу пользователей (Users).

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
нам нужно сделать `JOIN` таблиц `Events` и `Users` по полю `organizerId`.

Пример запроса:
```sql
SELECT * FROM Events
JOIN Users ON Events.organizerId = Users.id
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
  organizerId: { type: Schema.Types.ObjectId, ref: 'User' },
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
  localField: 'organizerId',
  foreignField: '_id',
  justOne: true,
})

const Event = mongoose.model('Event', EventSchema)

```

```js
const events = [
  {
    "id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7a"),
    "organizerId": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7b"),
    "tripName": "Велопокатушки",
    "description": "Мы поедем, мы помчимся",
    "isPrivate": false,
    "startDate": "2024-01-01",
    "endDate": "2024-01-10"
  },
  {
    "id": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7c"),
    "organizerId": ObjectId("5f8b1d8f0b9c2e1b1c9d4c7d"),
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
      localField: "organizerId",
      foreignField: "_id",
      as: "organizer",
    },
  },
]);
```


## Бинарные данные
Изображения, аудио, видео и тд.

// TODO: дописать
