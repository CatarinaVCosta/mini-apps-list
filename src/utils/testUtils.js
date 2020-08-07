export const state = {
    apps: [
        {
            id: "470fedc5-489e-5acb-a200-c85adaa18356",
            name: "Power Dialer",
            description:
              "Auto dialer that will help increase your connect rates and talk time.",
            categories: ["Dialer"],
            subscriptions: [
                {
                    name: "Trial",
                    price: 0
                },
                {
                    name: "Professional",
                    price: 4500
                },
                {
                    name: "Premium",
                    price: 6000
                }
            ]
        },
        {
            id: "9b565b11-7311-5b5e-a699-97873dffb361",
            name: "Voice Report",
            description: "Calls reporting and analytics of your calls.",
            categories: ["Voice Analytics", "Reporting", "Optimization"],
            subscriptions: [
                {
                    name: "Trial",
                    price: 0
                },
                {
                    name: "Professional",
                    price: 3500
                }
            ]
        }
    ],
    error: '',
    isLoading: false
};

export const sortedCategoriesResponse = ["Dialer", "Optimization", "Reporting", "Voice Analytics"];

export const sortedAppsBySumPlansPriceResponse = [
    {
        id: "9b565b11-7311-5b5e-a699-97873dffb361",
        name: "Voice Report",
        description: "Calls reporting and analytics of your calls.",
        categories: ["Voice Analytics", "Reporting", "Optimization"],
        subscriptions: [
            {
                name: "Trial",
                price: 0
            },
            {
                name: "Professional",
                price: 3500
            }
        ],
        totalSubscriptions: 3500
    },
    {
        id: "470fedc5-489e-5acb-a200-c85adaa18356",
        name: "Power Dialer",
        description:
          "Auto dialer that will help increase your connect rates and talk time.",
        categories: ["Dialer"],
        subscriptions: [
            {
                name: "Trial",
                price: 0
            },
            {
                name: "Professional",
                price: 4500
            },
            {
                name: "Premium",
                price: 6000
            }
        ],
        totalSubscriptions: 10500
    }
];

export const subscriptionsResponse = {
    "9b565b11-7311-5b5e-a699-97873dffb361": [
        {
            name: "Trial",
            price: "Free"
        },
        {
            name: "Professional",
            price: "€ 35.00"
        }
    ],
    "470fedc5-489e-5acb-a200-c85adaa18356": [
        {
            name: "Trial",
            price: "Free"
        },
        {
            name: "Professional",
            price: "€ 45.00"
        },
        {
            name: "Premium",
            price: "€ 60.00"
        }
    ]
}
