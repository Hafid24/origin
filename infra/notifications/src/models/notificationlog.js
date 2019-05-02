'use strict'
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const NotificationLog = sequelize.define(
    'NotificationLog',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true },
      sendDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        primaryKey: true
      },
      messageFingerprint: { type: DataTypes.STRING(255), primaryKey: true },
      ethAddress: { type: DataTypes.STRING(255) },
      channel: { type: DataTypes.STRING(255) }
    },
    {
      tableName: 'notification_log'
    }
  )
  NotificationLog.associate = function() {
    // associations can be defined here
  }
  return NotificationLog
}