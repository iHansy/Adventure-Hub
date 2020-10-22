
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "adventure" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE DEFAULT CURRENT_DATE,
	"park_name" TEXT,
	"image_url" TEXT NOT NULL,
	"street" TEXT,
	"city" TEXT,
	"state" TEXT NOT NULL,
	"zip_code" INT,
	"main_activities" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "user_adventure_likes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"adventure_id" INT REFERENCES "adventure"
);