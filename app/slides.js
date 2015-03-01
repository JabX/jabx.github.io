var Reflux = require('reflux');

var Actions = Reflux.createActions([
    'PostMessage'
]);

var Store = Reflux.createStore({
    listenables: [Actions],

    slides: [
        {
            title: "First Slide",
            picture: "img/slide1.jpg",
            text: [
                "Bullet Point 1",
                "Bullet Point 2",
                "   Bullet Point 2.1",
                "   Bullet Point 2.2",
                "Bullet Point 3"
            ],
            messages: [
                {
                    sender: "John Smith",
                    time: new Date(2015, 2, 2, 8, 23, 0, 0),
                    content: "Hello guys, anything to say on the first slide?"
                },
                {
                    sender: "Jane Porter",
                    time: new Date(2015, 2, 2, 8, 31, 0, 0),
                    content: "Well indeed, I'm not sure I got what the presenter said about point 2.2, can you help me?"
                }
            ]
        },
        {
            title: "Second Slide",
            picture: "img/slide2.jpg",
            text: [
                "Bullet Point 1",
                "Bullet Point 2",
                "   Bullet Point 2.1",
                "   Bullet Point 2.2",
                "Bullet Point 3",
                "   Bullet Point 3.1",
                "   Bullet Point 3.2",
                "   Bullet Point 3.3",
                "   Bullet Point 3.4",
                "Bullet Point 4",
                "Bullet Point 5",
                "Bullet Point 6",
                "   Bullet Point 6.1"
            ],
            messages: [
                {
                    sender: "Jane Porter",
                    time: new Date(2015, 2, 2, 8, 43, 0, 0),
                    content: "Wow, this slide is just horrible, there's too much information on it I can't figure out what I should really remember on that"
                },
                {
                    sender: "Chris Jack",
                    time: new Date(2015, 2, 2, 8, 46, 0, 0),
                    content: "I feel your pain, but from what I got I feel like everything is important on there"
                },
                {
                    sender: "John Smith",
                    time: new Date(2015, 2, 2, 9, 11, 0, 0),
                    content: "Oh really, the most important point is the second one, the rest is just detail. I agree the presenter should have made it clearer though."
                }
            ]
        },
        {
            title: "Third Slide",
            picture: "img/slide3.jpg",
            text: [
                "Bullet Point 1",
                "   Bullet Point 1.1",
                "   Bullet Point 1.2",
                "   Bullet Point 1.3",
                "Bullet Point 2",
                "   Bullet Point 2.1"
            ],
            messages: [

            ]
        }
    ],

    onPostMessage: function(slideId, message) {
        if(message != "") {
            this.slides[slideId].messages = this.slides[slideId].messages.concat({
                sender: "Me",
                time: new Date(Date.now()),
                content: message
            });

            this.trigger(this.slides);
        }
    }
});

module.exports = {Actions: Actions, Store: Store};
