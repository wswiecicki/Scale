export const mocker =
    {
        V60: {
            Roasters: [
                {
                    title: 'roasters First Item',
                },
                {
                    title: 'Second Item',
                },
                {
                    title: 'Third Item',
                },
                {
                    title: 'Fourth Item',
                },
                {
                    title: 'Fifth Item',
                },
                {
                    title: 'Sixth Item',
                },
                {
                    title: 'Seventh Item',
                },
            ],
            'Your Own': [
                {
                    title: 'own First Item',
                },
                {
                    title: 'Second Item',
                },
                {
                    title: 'Third Item',
                },
                {
                    title: 'Fourth Item',
                },
                {
                    title: 'Fifth Item',
                },
                {
                    title: 'Sixth Item',
                },
                {
                    title: 'Seventh Item',
                },
            ],
            Favourites: [
                {
                    title: 'fav First Item',
                },
                {
                    title: 'Second Item',
                },
                {
                    title: 'Third Item',
                },
                {
                    title: 'Fourth Item',
                },
                {
                    title: 'Fifth Item',
                },
                {
                    title: 'Sixth Item',
                },
                {
                    title: 'Seventh Item',
                },
            ]
        },
        Espresso: {
            Roasters: [
                {
                    title: 'roasters First Item',
                },
                {
                    title: 'Second Item',
                },
                {
                    title: 'Third Item',
                },
                {
                    title: 'Fourth Item',
                },
                {
                    title: 'Fifth Item',
                },
                {
                    title: 'Sixth Item',
                },
                {
                    title: 'Seventh Item',
                },
            ],
            'Your Own': [
                {
                    title: 'own First Item',
                },
                {
                    title: 'Second Item',
                },
                {
                    title: 'Third Item',
                },
                {
                    title: 'Fourth Item',
                },
                {
                    title: 'Fifth Item',
                },
                {
                    title: 'Sixth Item',
                },
                {
                    title: 'Seventh Item',
                },
            ],
            Favourites: [
                {
                    title: 'fav First Item',
                },
                {
                    title: 'Second Item',
                },
                {
                    title: 'Third Item',
                },
                {
                    title: 'Fourth Item',
                },
                {
                    title: 'Fifth Item',
                },
                {
                    title: 'Sixth Item',
                },
                {
                    title: 'Seventh Item',
                },
            ]
        }
    };

export const recipeGenerator = async (name, parent) => {
    const a = {
        title: `${name} - ${parent}`,
        description: `James Hoffman's recipe that will need to handle newline chars and not overflow if text is too long`,
        steps: [
            {
                name: 'bloom',
                time: 15,
                coffee: 20,
                water: 40,
                description: 'slowly'
            },
            {
                name: 'swirl',
                time: 5,
                coffee: 0,
                water: 0,
                description: ''
            },
            {
                name: 'wait',
                time: 25,
                coffee: 0,
                water: 0,
                description: ''
            },
            {
                name: 'pour',
                time: 30,
                coffee: 0,
                water: 160,
                description: 'Pour water slowly'
            },
            {
                name: 'wait',
                time: 10,
                coffee: 0,
                water: 0,
                description: ''
            },
            {
                name: 'pour',
                time: 30,
                coffee: 0,
                water: 133,
                description: 'slowly'
            },
            {
                name: 'stir',
                time: 5,
                coffee: 0,
                water: 0,
                description: '1 clockwise, 1 counterclockwise'
            },
            {
                name: 'swirl',
                time: 5,
                coffee: 0,
                water: 0,
                description: ''
            },
            {
                name: 'wait',
                time: 25,
                coffee: 0,
                water: 0,
                description: ''
            },
        ],
        favourite: false
    };
    await sleep(2000);
    return a;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
