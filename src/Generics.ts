export default {
    test() {
        /* Working with Generic Type Variables */
        function identity<T>(arg: T): T {
            return arg;
        }

        // let output = identity<string>("myString");
        let output = identity(123434355433534345);
        console.log(output);

        // function loggingIdentity<T>(arg: T[]): T[] {
        //     console.log(arg.length);
        //     return arg;
        // }
        function loggingIdentity<T>(arg: Array<T>): Array<T> {
            console.log(arg, arg.length);
            return arg;
        }
        loggingIdentity([1, 2, 2]);

        /* Generic Types */
        let myIdentity: <U>(arg: U) => U = identity;
        console.log(myIdentity({ key: "generic" }));

        interface GenericIdentityFn {
            <T>(arg: T): T;
        }

        function identity2<T>(arg: T): T {
            return arg;
        }

        let myIdentity2: GenericIdentityFn = identity2;
        console.log(myIdentity2(Symbol("aaaaa")));

        let myIdentity3: { <T>(arg: T): T } = identity2;
        console.log(myIdentity3("aab"));

        interface GenericIdentityFn2<T> {
            (arg: T): T;
        }
        function identity3<T>(arg: T): T {
            return arg;
        }

        let myIdentity4: GenericIdentityFn2<number> = identity3;
        console.log(myIdentity4(4444));

        class GenericNumber<T> {
            zeroValue: T;
            add: (x: T, y: T) => T;
            // static test: T;
        }

        let stringNumeric = new GenericNumber<string>();
        stringNumeric.zeroValue = "hello";
        stringNumeric.add = function(x, y) {
            return x + y;
        };

        console.log(stringNumeric.add(stringNumeric.zeroValue, ",test"));

        /* 类型约束 */
        interface Lengthwise {
            length: number;
        }

        function loggingIdentity2<T extends Lengthwise>(arg: T): T {
            console.log(arg.length);
            return arg;
        }

        console.log(loggingIdentity2({ length: 1, value: 3 }));

        function getProperty<T, K extends keyof T>(obj: T, key: K) {
            return obj[key];
        }
        let x = { a: 1, b: 2, c: 3, d: 4 };
        getProperty(x, "a");
        // getProperty(x, "null");

        /* Using Class Types in Generics  */
        function create<T, U>(c: { new (arg: U): T }, arg: U): T {
            return new c(arg);
        }

        console.log(create(Object, 222));

        class BeeKeeper {
            hasMask: boolean;
        }

        class ZooKeeper {
            nametag: string;
        }

        class Animal {
            numLegs: number;
        }

        class Bee extends Animal {
            keeper: BeeKeeper;
        }

        class Lion extends Animal {
            keeper: ZooKeeper;
        }

        function createInstance<A extends Animal>(c: new () => A): A {
            return new c();
        }

        console.log(createInstance(Lion)); // typechecks!
        console.log(createInstance(Bee)); // typechecks!
    },
};
