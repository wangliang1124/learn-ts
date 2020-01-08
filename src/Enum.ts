export default {
    test() {
        enum E {
            Foo,
            Bar,
            Baz,
        }

        // function f(x: E) {
        //     if (x !== E.Foo || x !== E.Bar) {
        //         //             ~~~~~~~~~~~
        //         // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
        //     }
        // }

        // const enum Enum {
        //     A = 1,
        //     // B = A * 2,
        // }

        enum Directions {
            Up,
            Down,
            Left,
            Right,
        }

        let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
        console.log(directions);
    },
};
