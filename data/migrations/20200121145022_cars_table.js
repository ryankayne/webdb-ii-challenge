
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();

      tbl.string('VIN').unique().notNullable();

      tbl.string('make').index().notNullable();

      tbl.string('model').index().notNullable();

      tbl.integer('mileage').index().notNullable();

      tbl.string('transmission').index();

      tbl.string('title').index();
  })
};

exports.down = function(knex) {
  
};
