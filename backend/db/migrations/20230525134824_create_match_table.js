/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('match', function(table) {
      table.increments('id').primary();
      table.string('home_team', 32).notNullable();
      table.string('home_logo', 100);
      table.integer('home_score');
      table.string('away_team', 32).notNullable();
      table.string('away_logo', 100);
      table.integer('away_score');
      table.integer('gameweek');
      table.date('date');
      table.date('expiry');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('match');
  };
  