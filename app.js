/* Viewmodel */
var myViewModel = {
    personName: 'Bob',
    personAge: 123
});
/* Observable */
var myViewModel = {
    personName: ko.observable('Bob'),
    personAge: ko.observable(123)
};
/* Array */
var myObservableArray = ko.observableArray();    // Initially an empty array
myObservableArray.push('Some value'); 

/* Component */
function Product(name, rating) {
    this.name = name;
    this.userRating = ko.observable(rating || null);
}
 
function MyViewModel() {
    this.products = [
        new Product('Garlic bread'),
        new Product('Pain au chocolat'),
        new Product('Seagull spaghetti', 'like') // This one was already 'liked'
    ];
}
 
ko.applyBindings(new MyViewModel());

/* Computed Function */
function AppViewModel() {
    // ... leave firstName and lastName unchanged ...
 
    this.fullName = function($scope) {
        return this.firstName() + " " + this.lastName();
    };
}
/* Binding Handler */
ko.bindingHandlers.hasFocus = {
    init: function(element, valueAccessor) {
        $(element).focus(function() {
            var value = valueAccessor();
            value(true);
        });
        $(element).blur(function() {
            var value = valueAccessor();
            value(false);
        });
    },
    update: function(element, valueAccessor) {
        var value = valueAccessor();
        if (ko.unwrap(value))
            element.focus();
        else
            element.blur();
    }
};
/* event Handler */

var Person = function(name, children) {
    this.name = ko.observable(name);
    this.children = ko.observableArray(children || []);
};
 
var PeopleModel = function() {
    this.people = ko.observableArray([
        new Person("Bob", [
            new Person("Jan"),
            new Person("Don", [
                new Person("Ted"),
                new Person("Ben", [
                    new Person("Joe", [
                        new Person("Ali"),
                        new Person("Ken")
                    ])
                ]),
                new Person("Doug")
            ])
        ]),
        new Person("Ann", [
            new Person("Eve"),
            new Person("Hal")
        ])
    ]);
 
    this.addChild = function(name, parentArray) {
        parentArray.push(new Person(name));
    };
};
 
ko.applyBindings(new PeopleModel());
 
//attach event handlers
$("#people").on("click", ".remove", function() {
    //retrieve the context
    var context = ko.contextFor(this),
        parentArray = context.$parent.people || context.$parent.children;
 
    //remove the data (context.$data) from the appropriate array on its parent (context.$parent)
    parentArray.remove(context.$data);
 
    return false;
});
 
$("#people").on("click", ".add", function() {
    //retrieve the context
    var context = ko.contextFor(this),
        childName = context.$data.name() + " child",
        parentArray = context.$data.people || context.$data.children;
 
    //add a child to the appropriate parent, calling a method off of the main view model (context.$root)
    context.$root.addChild(childName, parentArray);
 
    return false;
});