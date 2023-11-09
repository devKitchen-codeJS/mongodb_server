const CountrySchema = require("../models/CountrySchema");
const CitySchema = require("../models/CitySchema");
const TicketSchema = require("../models/TicketSchema");
const mongoose = require("mongoose");
const CustomerSchema = require("../models/CustomerSchema");

module.exports.createTicket = async function (req, res) {
  const {
    body: {
      code: code,
      place_type: place_type,
      airport_id_from: airport_id_from,
      airport_id_to: airport_id_to,
      from_city: from_city,
      to_city: to_city,
      price: price,
    },
  } = req;
  try {
    // console.log(
    //   code,
    //   place_type,
    //   airport_id_from,
    //   airport_id_to,
    //   from_city,
    //   to_city,
    //   price
    // );
  
    const createdTicket = await TicketSchema.create({
      code: code,
      place_type: place_type,
      airport_id_from: airport_id_from,
      airport_id_to: airport_id_to,
      from_city: from_city,
      to_city: to_city,
      price: price,
    });
    res.json(createdTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating a new city" });
  }
};

module.exports.getAllTickets = async function (req, res) {
  try {
    const tickets = await TicketSchema.find({});
    return res.json({ tickets });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error retrieving data from cities table" });
  }
};
module.exports.getTicketById = async function (req, res) {
  const { params: id } = req;
  console.log(id);
  try {
    const ticket = await TicketSchema.findById(id.id).populate(
      "place_type airport_id_from airport_id_to"
    );
    res.json(ticket);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error retrieving data from cities table" });
  }
};

module.exports.deleteTicket = async function (req, res) {
  const { params: cityId } = req;
  console.log(cityId.id);
  try {
    const deletedCity = await TicketSchema.deleteOne({ _id: cityId.id }); //findOneAndDelete
    res.json(deletedCity);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting city" });
  }
};

module.exports.updateTicket = async function (req, res) {
  const {
    body: data,
    params: { id },
  } = req;
  console.log(data, id);
  try {
    const updatedCity = await TicketSchema.findOneAndUpdate(
      { _id: id },
      { $set: { code: data.code } }
    );

    console.log(updatedCity);

    res.json(updatedCity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating city" });
  }
};

module.exports.useTransaction = async function (req, res) {
  const session = await mongoose.startSession();
  return (
    CustomerSchema.createCollection()
      .then(() => CustomerSchema.startSession())
      .then((_session) => {
        return session.withTransaction(() => {
          return CustomerSchema.create([{ name: "Test" }], {
            session: session,
          });
        });  
      })
      .then( async () => {
        const t = await  CustomerSchema.find({})
        console.log('t', t) 
      })
      .then(() => session.endSession())
      .then(() => res.status(200).json({message: 'DDONE'}))
  );  
};
