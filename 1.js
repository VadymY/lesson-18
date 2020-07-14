/*
Задача 1

Создайте класс `Customers` который умеет работать с механизмом `for of`.

1. Класс `Customers` содержит метод `add` который принимает объект в качестве параметра. У этого объекта есть обязательное поле `name` и необязательное поле `verified`.
2. Класс `Customers` при переборе с помощью `for of` должен учитывать только объекты у которых был установлен флаг `verified: true`.

**Обратите внимание**:
1. Использование генераторов **запрещено**.
2. Использование посторонних библиотек **запрещено**
3. У класса `Customers` **должен** быть метод `Symbol.iterator`
*/

// Решение
class Customers {
    constructor() {
        this.name = [];
        this.virified = [];
    }

    add({name, verified}) {
        this.name.push(name);
        this.virified.push(verified);
    }

    [Symbol.iterator]() {
        let i = 0;
        let self = this;

        return {
            next() {
                while (true) {
                    if (self.virified[i]) {
                        const value = i >= self.name.length ? undefined : self.name[i++];
                        const done = value != undefined ? false : true;
                        return { value, done }
                    } else {
                        i++;
                        if (i >= self.name.length) {
                            return { value: undefined, done: true}
                        }
                    }
                }
            }
        }
    }
}
// Пример использования:
const customers = new Customers();
customers.add({name: 'Alex'});
customers.add({name: 'Victor'});
customers.add({name: 'Marcus'});
customers.add({name: 'Andrii', verified: true});
customers.add({name: 'Marco', verified: true});
customers.add({name: 'Oliver'});
customers.add({name: 'Lisa', verified: true});
customers.add({name: 'John'});
customers.add({name: 'Ivan', verified: true});

for (const customer of customers) {
    console.log(customer);
}

// В консоли будет
// { name: 'Andrii', verified: true }
// { name: 'Marco', verified: true }
// { name: 'Lisa', verified: true }
// { name: 'Ivan', verified: true }

