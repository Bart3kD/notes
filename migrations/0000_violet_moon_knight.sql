CREATE TABLE IF NOT EXISTS "todo" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
