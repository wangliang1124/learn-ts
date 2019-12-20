// declare function create(o: object | null): void;

const BasicTypes = {
    test() {
        console.log(" ============ basic types test =============");

        let isDone: boolean = false;
        console.log("isDone===", isDone);

        let decimal = 6;
        // decimal = "6";
        // decimal = undefined;
        let hex: number = 0xf00d;
        // hex = 6;
        let binary: number = 0b1010;

        let octal: number = 0o744;

        console.log(decimal, hex, binary, octal);

        let color: string = "blue";
        color = "false";

        let list: number[] = [1, 2, 3];
        let arr: Array<number> = [4, 5, 6];
        // let arr2: Array = [7, 8];
        console.log(list, arr);

        // Tuple
        let x: [string, number];
        x = ["hello", 42];
        console.log(x[0].substring(1));
        // console.log(x[1].substring(1));
        // x[3] = "world";
        // console.log(x[5].toString());

        // Enum
        enum Color {
            Red = 99,
            Orange,
            Green = 1,
            Blue = 20,
        }
        let c: Color = Color.Green;
        let colorName: string = Color[99];
        console.log("c", c, Color, colorName);

        // any
        let notSure: any = 4;
        notSure.toString();
        notSure.toFixed();
        console.log("notSure", notSure);
        notSure = "may be a string";
        notSure = false;
        console.log("notSure", notSure);

        let prettySure: Object = 4;
        console.log("prettySure", typeof prettySure);
        // prettySure.toFixed();

        let list1: any[] = [1, true, "free"];
        list1[1] = 100;
        console.log(list1);

        function warnUser(): void {
            console.log("This is my warning message");
        }

        warnUser();

        let unusable: void = undefined;
        unusable = undefined;

        // let unusable2: void = null;
        // unusable2 = null;

        function error(message: string): never {
            throw new Error(message);
        }
        // error("error------");

        function fail() {
            return error("Something failed");
        }

        // fail();

        function infiniteLoop(): never {
            while (true) {}
        }

        // infiniteLoop();

        // create({ props: 0 });

        // assertion
        let someValue: any = "this is a string";
        // let strLength: number = (<string>someValue).length;
        let strLength: number = (someValue as string).length;
        console.log(strLength);
    },
};

export default BasicTypes;
