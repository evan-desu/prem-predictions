/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('prediction', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.integer('match_id').unsigned();
      table.integer('home_prediction').notNullable();
      table.integer('away_prediction').notNullable();
  
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('match_id').references('id').inTable('match');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('prediction');
  };
  
