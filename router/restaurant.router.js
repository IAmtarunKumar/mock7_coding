const express = require("express");
const { RestModel } = require("../model/restaurant.model");
const { auth } = require("../config/middleware/auth.middleware");

const restaurantRouter = express.Router();

//get all restaurants
restaurantRouter.get("/api/restaurants", async (req, res) => {
  try {
    let data = await RestModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//get by id restaurants

restaurantRouter.get("/api/restaurants/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await RestModel.find({ _id: id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//post restaurants details

restaurantRouter.post("/api/restaurants",auth, async (req, res) => {
  let payload = req.body;
  try {
    let user = new RestModel(payload);
    await user.save();
    res.status(200).send({ msg: "Restaurants Register succsessfully" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//get resturant menu
restaurantRouter.get("/api/restaurants/:id/menu", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await RestModel.findOne({ _id: id });
    res.status(200).send(data.menu);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//post menu in specific resturant

restaurantRouter.post("/api/restaurants/:id/menu",auth, async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    let rest = await RestModel.findOne({ _id: id });

    let menus = rest.menu;
    menus.push(payload);
    console.log(menus);

    let updateRestData = await RestModel.findByIdAndUpdate(
      { _id: id },
      { menu: menus }
    );

    res.status(200).send({ msg: "new menu added succsessfully" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//delete specific menue by its id

restaurantRouter.delete("/api/restaurants/:id/menu/:menuid",auth,async (req, res) => {
    let id = req.params.id;
    let menuid = req.params.menuid;

    try {
      let rest = await RestModel.findOne({ _id: id });
      let menus = rest.menu;
      let menuData = menus.filter((item) => {
        return item._id != menuid;
      });
      let updateRestData = await RestModel.findByIdAndUpdate(
        { _id: id },
        { menu: menuData }
      );

      res.status(200).send({ msg: "delete menu succsessfully" });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  }
);

module.exports = {
  restaurantRouter,
};
