# Работа с git и github

https://docs.github.com/ru/get-started/signing-up-for-github/signing-up-for-a-new-github-account

## Настройка имени пользователя и почты

```bash
git config --global user.name "example_name"
git config --global user.email "example_name@example.com"
```

## ssh-ключи

### Генерация ssh-ключей
Чтобы добавить ssh-ключ, нужно сгенерировать его командой:

```bash
ssh-keygen -t ed25519 -C "example_name@example.com"
```

### Добавление ssh-ключей на github
После генерации ключей, нужно добавить **публичный ключ** на github. 
Для этого нужно скопировать содержимое файла `~/.ssh/id_ed25519.pub` и добавить его в настройках github.
Обратите внимание на **pub** в конце имени файла — в `id_ed25519.pub` содержится **публичный ключ**, а не приватный.
На [github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) нужно добавить **публичный ключ** в разделе `Settings -> SSH and GPG keys -> New SSH key`.

### Клонирование репозитороия
После того, как ssh-ключи добавлены на github, можно клонировать репозиторий командой:

```bash
git clone git@github.com:GoWithMeOrg/go-with-me.git
```

Зайдите в папку с проектом и убедитесь, что вы находитесь на ветке `main`:

```bash
git branch
```

Проверьте remotes:

```bash
git remote -v
```

Должно быть что-то вроде:

```bash
origin  git@github.com:GoWithMeOrg/go-with-me.git (fetch)
origin  git@github.com:GoWithMeOrg/go-with-me.git (push)
```

### Создание ветки

```bash
git checkout -b feature/branch_name
```

### Добавление изменений в коммит

```bash
git add .
```

### Создание коммита

```bash
git commit -m "commit message"
```

### Отправка изменений на github

```bash
git push origin feature/branch_name
```
