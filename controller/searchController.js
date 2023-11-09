const AirportSchema = require("../models/AirportSchema");
const CitySchema = require("../models/CitySchema");
const CountrySchema = require("../models/CountrySchema");
const TicketSchema = require("../models/TicketSchema");

module.exports.searchAirport = async function (req, res) {
  const { body: data } = req;
  try {
    console.log(data);
    const airports = await AirportSchema.find()
      .where("name")
      .equals(data.name)
      .where("city")
      .equals(data.cityId);

    if (airports.length === 0) {
      res.status(404).json({ message: "Аэропорт не найден" });
    } else {
      res.status(200).json(airports);
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

module.exports.searchCountry = async function (req, res) {
  const { body: data } = req;
  try {
    const country = await CountrySchema.find()
      .where("name")
      .equals(data.name)
      .where("country_code")
      .equals(data.country_code);
    if (country.length === 0) {
      res.status(404).json({ message: "Country not found" });
    } else {
      res.status(200).json(country);
    }
  } catch (error) {
    res.status(500).json(JSON.stringify({ error }));
  }
};

module.exports.searchCity = async function (req, res) {
  const { body: data } = req;
  try {
    const city = await CitySchema.find().where('name').equals(data.name).populate('country')
    if (city.length === 0) {
      res.status(404).json({ message: "City not found" });
    } else {
      res.status(200).json(city);
    }
  } catch (error) {
    res.status(500).json(JSON.stringify({ error }));
  }
};

module.exports.searchTicket = async function (req, res) {
  const { body: data } = req;
  try {
    const ticket = await TicketSchema.find().where('code').equals(data.country)
    if (ticket.length === 0) {
      res.status(404).json({ message: "Ticket not found" });
    } else {
      res.status(200).json(ticket);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(JSON.stringify({ error }));
  }
};
