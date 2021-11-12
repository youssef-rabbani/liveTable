module.exports = (sequelize, DataTypes) => {
    const Initiatives = sequelize.define('initiatives', {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false
      },
      category:{
        type: DataTypes.STRING
      },
      initiatives:{
        type: DataTypes.STRING
      },
      experience_focus_area:{
        type: DataTypes.STRING
      },
      entity_kpi:{
        type: DataTypes.STRING
      },
      kpi:{
        type: DataTypes.STRING
      },
      actual:{
        type: DataTypes.STRING
      },
      target:{
        type: DataTypes.STRING
      },
      delivery_date:{
        type: DataTypes.DATEONLY
      },
      status:{
        type: DataTypes.STRING
      },
    },
      {
        freezeTableName: true,
      }
    );
  
    return Initiatives;
  }