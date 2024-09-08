#### personSearch Response Object:

METHOD - personSearch

```javascript

// чтобы вытащить массив найденных актеров из Axios: res?.data?.docs

{
    "docs": [
        {
            "id": 6266,
            "name": "Майкл Рукер",
            "enName": "Michael Rooker",
            "photo": "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/ef7840ab-62aa-4d90-947c-c107292c0485/orig",
            "sex": "Мужской",
            "growth": 178,
            "birthday": "1955-04-06T00:00:00.000Z",
            "death": "",
            "age": 69
        },
        {
            "id": 62298,
            "name": "Майкл Ракер",
            "enName": "Michael Rucker",
            "photo": "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/85769121-8847-4bac-903d-91024878cad3/orig",
            "sex": "Мужской",
            "growth": 0,
            "birthday": "",
            "death": "",
            "age": 0
        },
    ],
    "total": 1000,
    "limit": 3,
    "page": 1,
    "pages": 334
}

```
