export default {
    test() {
        interface Func {
            (x: number, y: number): number;
        }
        let myAdd: Func = function(x: number, y: number): number {
            return x + y;
        };

        // let myAdd: (x: number, y: number) => number = function(x: number, y: number) {
        //     return x + y;
        // };

        console.log(myAdd(333, 444));

        // function buildName(firstName: string, lastName?: string) {
        //     if (lastName) return firstName + " " + lastName;
        //     else return firstName;
        // }

        let result1 = buildName("Bob"); // works correctly now
        let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
        let result3 = buildName("Bob", "Adams"); // ah, just right

        function buildName(firstName: string, ...restOfName: string[]) {
            return firstName + " " + restOfName.join(" ");
        }

        // employeeName will be "Joseph Samuel Lucas MacKinzie"
        let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

        // this
        interface Card {
            suit: string;
            card: number;
        }
        interface Deck {
            suits: string[];
            cards: number[];
            createCardPicker(this: Deck): () => Card;
        }
        let deck: Deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            createCardPicker: function(this: Deck) {
                console.log("outer this", this);

                return () => {
                    console.log("inner this", this);

                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
                };
            },
        };

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

        /* overloads */
        // let suits = ["hearts", "spades", "clubs", "diamonds"];

        // function pickCard(x: any): any {
        //     // Check to see if we're working with an object/array
        //     // if so, they gave us the deck and we'll pick the card
        //     if (typeof x == "object") {
        //         let pickedCard = Math.floor(Math.random() * x.length);
        //         return pickedCard;
        //     }
        //     // Otherwise just let them pick the card
        //     else if (typeof x == "number") {
        //         let pickedSuit = Math.floor(x / 13);
        //         return { suit: suits[pickedSuit], card: x % 13 };
        //     }
        // }

        // let myDeck = [
        //     { suit: "diamonds", card: 2 },
        //     { suit: "spades", card: 10 },
        //     { suit: "hearts", card: 4 },
        // ];
        // let pickedCard1 = myDeck[pickCard(myDeck)];
        // console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        // let pickedCard2 = pickCard(15);
        // console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x: { suit: string; card: number }[]): number;
        function pickCard(x: number): { suit: string; card: number };
        function pickCard(x: any): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }

        let myDeck = [
            { suit: "diamonds", card: 2 },
            { suit: "spades", card: 10 },
            { suit: "hearts", card: 4 },
        ];
        let pickedCard1 = myDeck[pickCard(myDeck)];
        console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        let pickedCard2 = pickCard(12);
        console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
    },
};
