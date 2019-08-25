
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

//Créer le modèle
const Vehicule = Backbone.Model.extend();

//Créer une collection
const Vehicules = Backbone.Collection.extend({
    model: Vehicule
});

//Créer une vue pour un véhicule
const VehiculeView = Backbone.View.extend({
    tagName: "li",
    className: "vehicule",
    attributes: {
        "data-color": "blue"
    },
    render: function(){
        this.$el.html(this.model.get("registrationNumber") + " <button>Delete</button>");
        this.$el.attr("id", this.model.id);
        return this;
    }
});

//Créer une vue pour la liste de véhicules
const VehiculesListView = Backbone.View.extend({
    tagName: "ul",

    initialize: function(){
        this.model.on("add", this.onVehiculeAdd, this);
        this.model.on("remove", this.onVehiculeRemove, this);
    },

    onVehiculeAdd: function(vehicule){
        let vehiculeView = new VehiculeView({ model: vehicule});
        this.$el.append(vehiculeView.render().$el);
    },

    onVehiculeRemove: function(vehicule){
        this.$el.find("li#" + vehicule.id).remove();
    },

    render: function(){
        let self = this;

        this.model.each(function(vehicule){
            let vehiculeView = new VehiculeView({ model: vehicule});
            self.$el.append(vehiculeView.render().$el);
        });
    }
});

//Créer une liste de véhicules
let vehiculeArray = new Vehicules([
    new Vehicule({id: 1, registrationNumber: "AAJ533", make: "Toyota"}),
    new Vehicule({id: 2, registrationNumber: "GRC123", make: "Honda"}),
    new Vehicule({id: 3, registrationNumber: "GLU456", make: "Ford"})
]);

//créer une vue
let vehiculesListView = new VehiculesListView({el: "#container", model: vehiculeArray});
vehiculesListView.render();