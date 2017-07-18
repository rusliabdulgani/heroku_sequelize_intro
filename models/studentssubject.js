'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentsSubject = sequelize.define('StudentsSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });
  
  StudentsSubject.associate = (models) => {
    StudentsSubject.belongsTo(models.Student);
    StudentsSubject.belongsTo(models.Subject);
  }
  return StudentsSubject;
};
