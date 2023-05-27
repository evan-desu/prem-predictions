/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('leaderboard', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.integer('prediction_id').unsigned();
      table.integer('points');
  
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('prediction_id').references('id').inTable('prediction');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('leaderboard');
  };
  
