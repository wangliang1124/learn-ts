export default {
    test() {
        class Greeter {
            private greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }
            greet() {
                return "Hello, " + this.greeting;
            }
        }

        let greeter: Greeter = new Greeter("world");
        console.log(greeter);
        console.log(greeter.greet());

        class Animal {
            private name: string;
            constructor(theName: string) {
                this.name = theName;
            }
            move(distanceInMeters: number = 0) {
                console.log(`Animal moved ${distanceInMeters}m`);
            }
        }
        class Dog extends Animal {
            bark() {
                console.log("woo woo");
            }
        }
        const dog = new Dog("dog1");
        console.log(dog, Dog.prototype);
        dog.bark();
        dog.move(10);

        class Snake extends Animal {
            constructor(name: string) {
                super(name);
                // this.name = name;
                console.log("snake constructor");
            }
            move(distanceInMeters = 5) {
                console.log("Slithering...");
                super.move(distanceInMeters);
            }
        }

        let animal = new Animal("Goat");
        let sam: Animal = new Snake("===Sammy the Python");
        // let tom: Animal = new Horse("Tommy the Palomino");
        animal = sam;
        console.log(animal, sam);
        sam.move();

        class Octopus {
            // readonly name: string;
            readonly numberOfLegs: number = 8;
            constructor(public readonly name: string) {
                this.name = name;
            }
        }

        console.log(new Octopus("octopus"));

        const fullNameMaxLength = 10;

        class Employee {
            private _fullName: string = "testing";

            get fullName(): string {
                return this._fullName;
            }

            set fullName(newName: string) {
                try {
                    if (newName && newName.length > fullNameMaxLength) {
                        throw new Error("fullName has a max length of " + fullNameMaxLength);
                    }
                    this._fullName = newName;
                } catch (error) {
                    console.log(error);
                }
            }
        }

        let employee = new Employee();
        // employee.fullName = "Bob Smith";
        if (employee.fullName) {
            console.log(employee.fullName);
        }
        employee.fullName = "Bob Smith======";

        class Grid {
            static origin = { x: 0, y: 0 };
            calculateDistanceFromOrigin(point: { x: number; y: number }) {
                let xDist = point.x - Grid.origin.x;
                let yDist = point.y - Grid.origin.y;
                return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
            }
            constructor(public scale: number) {}
        }

        let grid1 = new Grid(1.0); // 1x scale
        let grid2 = new Grid(5.0); // 5x scale

        console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
        console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

        abstract class Department {
            constructor(public name: string) {}

            printName(): void {
                console.log("Department name: " + this.name);
            }

            abstract printMeeting(): void; // must be implemented in derived classes
        }

        class AccountingDepartment extends Department {
            constructor() {
                super("AccountingDepartment");
            }
            printMeeting(): void {}
            generateReports(): void {
                console.log("Generating accounting reports...");
            }
        }
        let department: Department;
        department = new AccountingDepartment();
        console.log(department);
        // department.generateReports(); // Property 'generateReports' does not exist on type 'Department

        (function() {
            class Greeter {
                static standardGreeting = "Hello, there";
                greeting: string = "";
                greet() {
                    if (this.greeting) {
                        return "Hello, " + this.greeting;
                    } else {
                        return Greeter.standardGreeting;
                    }
                }
            }

            let greeter1: Greeter;
            greeter1 = new Greeter();
            console.log(greeter1.greet());
            console.log(typeof Greeter);
            let greeterMaker: typeof Greeter = Greeter;
            greeterMaker.standardGreeting = "Hey there!";

            let greeter2: Greeter = new greeterMaker();
            console.log(greeter2.greet());
        })();
    },
};
