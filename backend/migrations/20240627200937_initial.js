/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	return knex.schema.createTable("urls", (table) => {
		table.string("id", 12).primary();
		table.string("url", 1024).notNullable();
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	throw new Error("Not implemented");
}
