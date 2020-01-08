export default {
    test() {
        interface Named {
            name: string;
        }

        class Person {
            name: string;
        }

        let p: Named;
        // OK, because of structural typing
        p = new Person();
        console.log(p);

        enum EventType {
            Mouse,
            Keyboard,
        }

        interface Event {
            timestamp: number;
        }
        interface MouseEvent extends Event {
            x: number;
            y: number;
        }
        interface KeyEvent extends Event {
            keyCode: number;
        }

        function listenEvent(eventType: EventType, handler: (n: Event) => void) {
            /* ... */
        }

        // Unsound, but useful and common
        // listenEvent(EventType.Mouse, (e: MouseEvent) => {
        //     console.log(e.x + "," + e.y);
        // });

        // Undesirable alternatives in presence of soundness
        listenEvent(EventType.Mouse, (e: Event) => console.log((e as MouseEvent).x + "," + (e as MouseEvent).y));
        // listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

        // Still disallowed (clear error). Type safety enforced for wholly incompatible types
        // listenEvent(EventType.Mouse, (e: number) => console.log(e));

        function invokeLater(args: any[], callback: (...args: any[]) => void) {
            /* ... Invoke callback with 'args' ... */
        }

        // Unsound - invokeLater "might" provide any number of arguments
        invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

        // Confusing (x and y are actually required) and undiscoverable
        invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));
    },
};
