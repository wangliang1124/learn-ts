export default {
    test() {
        // Intersection Types
        function extend<First, Second>(first: First, second: Second): First & Second {
            const result: Partial<First & Second> = {};
            for (const prop in first) {
                if (Object.hasOwnProperty.call(first, prop)) {
                    (result as First)[prop] = first[prop];
                }
            }
            for (const prop in second) {
                if (Object.hasOwnProperty.call(second, prop)) {
                    (result as Second)[prop] = second[prop];
                }
            }
            return result as First & Second;
        }

        class Person {
            constructor(public name: string) {}
        }

        interface Loggable {
            log(name: string): void;
        }

        class ConsoleLogger implements Loggable {
            log = (name: string) => {
                console.log(`Hello, I'm ${name}.`);
            };
        }
        console.log(Object.getOwnPropertyDescriptors(ConsoleLogger.prototype));
        const jim = extend(new Person("Jim"), new ConsoleLogger());
        jim.log(jim.name);

        /* Union Types */
        function padLeft(value: string, padding: string | number) {
            if (typeof padding === "number") {
                return Array(padding + 1).join(" ") + value;
            }
            if (typeof padding === "string") {
                return padding + value;
            }
            throw new Error(`Expected string or number, got '${padding}'.`);
        }

        console.log(padLeft("Hello world", "=== ")); // returns "    Hello world"
        // console.log(padLeft("Hello world", true)); // error

        interface Bird {
            fly(): void;
            layEggs(): void;
        }

        interface Fish {
            swim(): void;
            layEggs(): void;
        }
        function getSmallPet(): Fish | Bird {
            return {
                fly() {},
                swim() {},
                layEggs() {},
            };
        }
        // let pet = getSmallPet();
        // pet.layEggs(); // okay
        // pet.swim(); // errors

        /* Type Guards and Differentiating Types */
        let pet = getSmallPet();
        // 每一个成员访问都会报错
        if (isFish(pet)) {
            pet.swim();
        } else {
            pet.fly();
        }
        function isFish(pet: Fish | Bird): pet is Fish {
            return (pet as Fish).swim !== undefined;
        }

        // strictNullChecks
        let s = "foo";
        // s = null; // 错误, 'null'不能赋值给'string'
        let sn: string | null = "bar";
        sn = null; // 可以

        // sn = undefined; // error, 'undefined'不能赋值给'string | null'
        /* 
        function broken(name: string | null): string {
            function postfix(epithet: string) {
                return name.charAt(0) + ".  the " + epithet; // error, 'name' is possibly null
            }
            name = name || "Bob";
            return postfix("great");
        }
        */

        function fixed(name: string | null): string {
            function postfix(epithet: string) {
                return name!.charAt(0) + ".  the " + epithet; // ok
            }
            name = name || "Bob";
            return postfix("great");
        }

        type LinkedList<T> = T & { next: LinkedList<T> };

        interface Person {
            name: string;
        }

        var people: LinkedList<Person>;
        // var s = people.name;
        // var s = people.next.name;
        // var s = people.next.next.name;
        // var s = people.next.next.next.name;

        type Alias = { num: number };
        interface Interface {
            num: number;
        }
        // declare function aliased(arg: Alias): Alias;
        // declare function interfaced(arg: Interface): Interface;

        interface Square {
            kind: "square";
            size: number;
        }
        interface Rectangle {
            kind: "rectangle";
            width: number;
            height: number;
        }
        interface Circle {
            kind: "circle";
            radius: number;
        }
        type Shape = Square | Rectangle | Circle;

        function assertNever(x: any): never {
            throw new Error("Unexpected object: " + x);
        }

        function area(s: Shape): number {
            switch (s.kind) {
                case "square":
                    return s.size * s.size;
                case "rectangle":
                    return s.height * s.width;
                case "circle":
                    return Math.PI * s.radius ** 2;
                default:
                    return assertNever(s);
            }
        }

        function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
            return names.map(n => o[n]);
        }

        interface Person {
            name: string;
            age: number;
        }
        let person: Person = {
            name: "Jarid",
            age: 35,
        };
        let strings: string[] = pluck(person, ["name"]); // ok, string[]
        console.log(strings);

        interface Map<T> {
            [key: string]: T;
        }
        let keys: keyof Map<number> = "xxx"; // string
        let value: Map<number>["foo"] = 12; // number
        let map: Map<boolean> = { b: true };
        console.log(map, keys, value);
    },
};
