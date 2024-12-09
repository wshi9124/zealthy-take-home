# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

PageConfig.create(page: 1, components: ["about_me","birthdate"])  # Page 1 will have email and password fields
PageConfig.create(page: 2, components: ["address"])  # Page 2 will have these fields