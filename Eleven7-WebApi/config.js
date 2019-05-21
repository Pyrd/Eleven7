
const DbConnectionString='mssql://test:azerty@DESKTOP-MRPP9KR:1433/Eleven7DB'

//HIDE KEY IN ENV VAR
module.exports = {
    'secretKey': 'mysupersecretkey',
    DbConnectionString : DbConnectionString
  };