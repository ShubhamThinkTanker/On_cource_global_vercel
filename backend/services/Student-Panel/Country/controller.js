// const EstateStructureServices = require('./service')
const countryModel = require('./countryModel')
const stateModel = require('./stateModel')
const cityModel = require('./Citymodel')
const { Country, State, City } = require("country-state-city")
const { commonResponse } = require("../../../helper");
module.exports = {

  GetAllCountry: async (req, res, next) => {
    try {

      let allCountry = await countryModel.find()
      let countryName = allCountry.map(index => index.name)

      var allCountryData = []
      if (countryName) {
        for (let i = 0; i < countryName.length; i++) {
          var obj = {}
          obj['value'] = countryName[i]
          obj['label'] = countryName[i]
          allCountryData.push(obj)
        }

        return commonResponse.success(res, 200, 'Get all countrys', allCountryData);

      } else {
        return commonResponse.customErrorResponse(res, 422, 'Something went wrong');
      }

    } catch (error) {
      console.log(error);
    }
  },

  GetAllState: async (req, res, next) => {
    try {

      let countryname = req.query.countryname || "";

      let FindCountrycode = await countryModel.find({ name: countryname })
      let getCountryCode = FindCountrycode.map(index => index.countryCode)

      let allState = await stateModel.find({ countryCode: getCountryCode })

      let stateName = allState.map(index => index.name)

      var allStateData = []
      if (stateName) {
        for (let i = 0; i < stateName.length; i++) {
          var obj = {}
          obj['value'] = stateName[i]
          obj['label'] = stateName[i]
          allStateData.push(obj)
        }

        if (stateName) {
          return commonResponse.success(res, 200, 'Get all State', allStateData);
        } else {
          return commonResponse.customErrorResponse(res, 422, 'Something went wrong');
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  GetAllCity: async (req, res, next) => {
    try {

      let statename = req.query.statename || "";

      let FindCountrycode = await stateModel.find({ name: statename })

      let getisoCode = FindCountrycode.map(index => index.isoCode)
      let getCountry = FindCountrycode.map(index => index.countryCode)

      let allCountry = await cityModel.find({
        stateCode: getisoCode,
        countryCode: getCountry
      })





      let cityName = allCountry.map(index => index.name)

      var allCityData = []
      if (cityName) {
        for (let i = 0; i < cityName.length; i++) {
          var obj = {}
          obj['value'] = cityName[i]
          obj['label'] = cityName[i]
          allCityData.push(obj)
        }

        if (cityName) {
          return commonResponse.success(res, 200, 'Get all Cities', allCityData);
        } else {
          return commonResponse.customErrorResponse(res, 422, 'Something went wrong');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}