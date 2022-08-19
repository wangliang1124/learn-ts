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
        stringNumeric.add = function (x, y) {
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
    test2() {
        // type num = 1;
        // type str = "hello world";

        // type IsNumber<N> = N extends number ? "yes, is a number" : "no, not a number";

        // type result1 = IsNumber<num>; // "yes, is a number"
        // type result2 = IsNumber<str>; // "no, not a number"
        // const res: result1 = "yes, is a number";
        // console.log(res);

        // 这里定义一个工具类型，简化代码
        type ReplaceValByOwnKey<T, S extends any> = { [P in keyof T]: S[P] };

        // shift action
        type ShiftAction<T extends any[]> = ((...args: T) => any) extends (arg1: any, ...rest: infer R) => any
            ? R
            : never;

        // unshift action
        type UnshiftAction<T extends any[], A> = ((args1: A, ...rest: T) => any) extends (...args: infer R) => any
            ? R
            : never;

        // pop action
        type PopAction<T extends any[]> = ReplaceValByOwnKey<ShiftAction<T>, T>;

        // push action
        type PushAction<T extends any[], E> = ReplaceValByOwnKey<UnshiftAction<T, any>, T & { [k: string]: E }>;

        // test ...
        type tuple = ["vue", "react", "angular"];

        type resultWithShiftAction = ShiftAction<tuple>; // ["react", "angular"]
        type resultWithUnshiftAction = UnshiftAction<tuple, "jquery">; // ["jquery", "vue", "react", "angular"]
        type resultWithPopAction = PopAction<tuple>; // ["vue", "react"]
        type resultWithPushAction = PushAction<tuple, "jquery">; // ["vue", "react", "angular", "jquery"]
    },
    test3() {
        // create({ prop: 0 }); // OK
        // create(null); // Error
        // create(undefined); // Error
        // create(42); // OK
        // create("string"); // OK
        // create(false); // OK
        // create({
        //     toString() {
        //         return 3;
        //     },
        // }); // OK

        const enum ActiveType {
            active = 1,
            inactive = 2,
        }

        function isActive(type: ActiveType) {}
        isActive(ActiveType.active);

        // ============================== compile result:
        // function isActive(type) { }
        // isActive(1 /* active */);

        // ActiveType[1]; // Error
        // ActiveType[10]; // Error

        // type Foo<T extends object> = T extends object ? T : never;
        // type F = Foo<Array<number>>; // 类型“number”不满足约束“object”。
        // type G = Foo<number>; // 类型“string”不满足约束“object”。
        // type H = Foo<{}>; // OK
    },
};
declare function create(o: Object): void;
