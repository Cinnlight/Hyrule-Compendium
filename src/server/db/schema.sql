CREATE SEQUENCE IF NOT EXISTS page_categories_id_seq;

CREATE TABLE IF NOT EXISTS "Page Categories" (
  page_id integer NOT NULL,
  category_id integer NOT NULL,
  "KEY" text[] NOT NULL,
  PRIMARY KEY ("KEY")
);

COMMENT ON COLUMN "Page Categories".page_id IS 'ON DELETE CASCADE';
COMMENT ON COLUMN "Page Categories"."KEY" IS '(page_id, category_id)';

CREATE SEQUENCE IF NOT EXISTS comments_id_seq;

CREATE TABLE IF NOT EXISTS Comments (
  id serial NOT NULL PRIMARY KEY,
  page_id integer,
  user_id integer,
  comment text NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  reactions json
);

COMMENT ON COLUMN Comments.page_id IS 'ON DELETE CASCADE';
COMMENT ON COLUMN Comments.reactions IS '{ [ reaction1, count1 ], [ reaction2, count2 ], etc }';

CREATE SEQUENCE IF NOT EXISTS content_id_seq;

CREATE TABLE IF NOT EXISTS Content (
  id serial NOT NULL PRIMARY KEY,
  page_id integer NOT NULL,
  content text NOT NULL,
  version integer,
  created_by integer,
  created_at timestamp,
  updated_at timestamp,
  contributors integer,
  verified_at timestamp,
  verified_by integer
);

COMMENT ON COLUMN Content.page_id IS 'ON DELETE CASCADE';
COMMENT ON COLUMN Content.version IS 'Default 1';
COMMENT ON COLUMN Content.contributors IS '( users )';

CREATE TABLE IF NOT EXISTS Categories (
  id integer NOT NULL PRIMARY KEY,
  name varchar(500) NOT NULL UNIQUE
);

COMMENT ON COLUMN Categories.name IS 'Unique';

CREATE TABLE IF NOT EXISTS Users (
  id integer NOT NULL PRIMARY KEY,
  login varchar(500) NOT NULL UNIQUE,
  display_name varchar(500) NOT NULL,
  email varchar(500) NOT NULL UNIQUE,
  password varchar(500) NOT NULL,
  avatar_url varchar(500),
  created_at timestamp,
  updated_at timestamp
);

COMMENT ON COLUMN Users.login IS 'Unique, lowercase of display_name';
COMMENT ON COLUMN Users.email IS 'Unique';

CREATE TABLE IF NOT EXISTS Pages (
  id integer NOT NULL PRIMARY KEY,
  title varchar(500) NOT NULL UNIQUE,
  slug varchar(500) NOT NULL UNIQUE,
  created_by integer,
  created_at timestamp,
  updated_at timestamp
);

COMMENT ON COLUMN Pages.title IS 'Unique';
COMMENT ON COLUMN Pages.slug IS 'Unique, URL-friendly identifier (eg. /this-certain-page)';

CREATE SEQUENCE IF NOT EXISTS reactions_id_seq;

CREATE TABLE IF NOT EXISTS Reactions (
  id serial NOT NULL PRIMARY KEY,
  emoji_url varchar(500)
);

ALTER TABLE Comments ADD CONSTRAINT Comments_page_id_fk FOREIGN KEY (page_id) REFERENCES Pages (id);
ALTER TABLE Comments ADD CONSTRAINT Comments_user_id_fk FOREIGN KEY (user_id) REFERENCES Users (id);
ALTER TABLE Content ADD CONSTRAINT Content_created_by_fk FOREIGN KEY (created_by) REFERENCES Users (id);
ALTER TABLE Content ADD CONSTRAINT Content_page_id_fk FOREIGN KEY (page_id) REFERENCES Pages (id);
ALTER TABLE "Page Categories" ADD CONSTRAINT "Page Categories_category_id_fk" FOREIGN KEY (category_id) REFERENCES Categories (id);
ALTER TABLE "Page Categories" ADD CONSTRAINT "Page Categories_page_id_fk" FOREIGN KEY (page_id) REFERENCES Pages (id);
ALTER TABLE Pages ADD CONSTRAINT Pages_created_by_fk FOREIGN KEY (created_by) REFERENCES Users (id);
ALTER TABLE Content ADD CONSTRAINT Content_verified_by_fk FOREIGN KEY (verified_by) REFERENCES Users (id);
ALTER TABLE Content ADD CONSTRAINT Content_contributors_fk FOREIGN KEY (contributors) REFERENCES Users (id);
ALTER TABLE Comments ADD CONSTRAINT Comments_reactions_fk FOREIGN KEY (reactions) REFERENCES Reactions (id);