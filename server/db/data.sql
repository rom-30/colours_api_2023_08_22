DROP TABLE IF EXISTS colours;

CREATE TABLE colours (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

INSERT INTO colours (name) VALUES ('plum'), ('firebrick'), ('tan'), ('222'), ('cadetblue'), ('lightskyblue'), ('red'), ('green');
