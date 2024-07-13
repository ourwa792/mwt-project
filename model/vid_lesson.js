const {DataTypes} = require("sequelize");
const seq = require("../utils/database").seq

const VideoLesson = seq.define(
  "videolesson",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      alowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    quizess:{
      type: DataTypes.JSON
    },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


/* (async () => {
  await seq.sync({ force: true });

  await VideoLesson.bulkCreate([{
      title: 'Interactive Video Quiz 1',
      link: 'https://www.youtube.com/watch?v=nCIQEqcmMSc',
      description: 'This is a video 1 lesson with a quiz',
      grade: "الصف الرابع" ,
      quizess: [
          {
              time: 784,
              question: "بسط التعبير التالي <math xmlns='http://www.w3.org/1998/Math/MathML'><mfrac><mrow><mi>x</mi><mo>+</mo><mn>2</mn></mrow><mn>3</mn></mfrac></math>",
              options: ["<math xmlns='http://www.w3.org/1998/Math/MathML'><mn>1</mn></math>", "<math xmlns='http://www.w3.org/1998/Math/MathML'><mfrac><mn>1</mn><mn>3</mn></mfrac></math>", "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>x</mi></math>", "<math xmlns='http://www.w3.org/1998/Math/MathML'><mfrac><mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow><mn>3</mn></mfrac></math>"],
              correct: 3,
              asked: false
          },
          {
              time: 10,
              question: "What is the derivative of <math><msin/><mi>x</mi></math>?",
              options: ["<math><mrow><mfrac><mi>d</mi><mi>d</mi></mfrac><mi>x</mi><msin/><mi>x</mi></mrow></math>", "<math><mrow><mi>d</mi><mi>x</mi><msin/><mi>x</mi></mrow></math>", "<math><mrow><mi>cos</mi><mi>x</mi></mrow></math>", "<math xmlns='http://www.w3.org/1998/Math/MathML'><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo></math>"],
              correct: 2,
              asked: false
          }
      ],
      thumbnailUrl: '/image/video_lesson/G3_L1.png'
  },{
      title: 'Interactive Video Quiz 2',
      link: 'https://www.youtube.com/watch?v=nCIQEqcmMSc',
      description: 'This is a video 2 lesson with a quiz',
      grade: "الصف التاسع" ,
      quizess: [
          {
              time: 74,
              question: "بسط التعبير التالي <math><mfrac><mrow><mi>x</mi><mo>+</mo><mn>2</mn></mrow><mn>3</mn></mfrac></math>",
              options: ["<math><mn>1</mn></math>",
                   "<math><mfrac><mn>1</mn><mn>3</mn></mfrac></math>",
                   "<math><mi>x</mi></math>",
                    "<math><mfrac><mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow><mn>3</mn></mfrac></math>"],
              correct: 3,
              asked: false
          },
          {
              time: 5,
              question: "What is the derivative of <math><msin/><mi>x</mi></math>?",
              options: ["<math><mrow><mfrac><mi>d</mi><mi>d</mi></mfrac><mi>x</mi><msin/><mi>x</mi></mrow></math>",
                   "<math><mrow><mi>d</mi><mi>x</mi><msin/><mi>x</mi></mrow></math>",
                    "<math><mrow><mi>cos</mi><mi>x</mi></mrow></math>", 
                    "<math><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo></math>"],
              correct: 2,
              asked: false
          }
      ],
      thumbnailUrl: '/image/video_lesson/G5_L8.png'
  }]);

  console.log('Database synced and data seeded!');
  process.exit();
})(); */



module.exports = VideoLesson;
