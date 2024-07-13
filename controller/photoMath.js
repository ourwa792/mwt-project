const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");



exports.solveEquation = async (req, res, next) => {
    try {
        const url = "https://photomath1.p.rapidapi.com/maths/v2/solve-problem";
  
      // إعداد بيانات form-data
      const data = new FormData();
      data.append('locale', 'en');
      data.append('image', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      });
  
      const options = {
        method: 'POST',
        headers: {
            "x-rapidapi-key": "5990462cb0mshdf2f682415aa17ap11ffb4jsnf02880029067",
            "x-rapidapi-host": "photomath1.p.rapidapi.com",
            ...data.getHeaders(),
          },
        data: data,
        url,
      };

      const respons = await axios(options)
      const result = respons.data

      res.json(result)
    } catch (error) {
      next(error);
    }
  };