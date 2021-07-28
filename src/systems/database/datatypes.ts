enum DataTypes {
  /** Tiny integer, -128 to 127 signed. */
  TINYINT = "TINYINT",
  /** Synonym for TINYINT(1). */
  BOOLEAN = "BOOLEAN",
  /** Small integer from -32,768 to 32,767 signed. */
  SMALLINT = "SMALLINT",
  /** Medium integer from -8,388,608 to 8,388,607 signed. */
  MEDIUMINT = "MEDIUMINT",
  /** Integer from -2,147,483,648 to 2,147,483,647 signed */
  INT = "INT",
  /** Synonym for INT */
  INTEGER = "INTEGER",
  /** Large integer. */
  BIGINT = "BIGINT",
  /** A packed "exact" fixed-point number. */
  DECIMAL = "DECIMAL",
  /** Synonyms for DECIMAL */
  DEC = "DEC",
  /** Synonyms for DECIMAL */
  NUMERIC = "NUMERIC",
  /** Synonyms for DECIMAL */
  FIXED = "FIXED",
  /** Synonym for DECIMAL in Oracle mode. */
  NUMBER = "NUMBER",
  /** Single-precision floating-point number */
  FLOAT = "FLOAT",
  /** Normal-size (double-precision) floating-point number */
  DOUBLE = "DOUBLE",
  /** REAL and DOUBLE PRECISION are synonyms for DOUBLE. */
  "DOUBLE PRECISION" = "DOUBLE PRECISION",
  /** REAL and DOUBLE PRECISION are synonyms for DOUBLE. */
  REAL = "REAL",
  /** Bit field type. */
  BIT = "BIT",
  /** A synonym for TINYINT. */
  INT1 = "INT1",
  /** Synonym for SMALLINT. */
  INT2 = "INT2",
  /** Synonym for MEDIUMINT. */
  INT3 = "INT3",
  /** Synonym for INT. */
  INT4 = "INT4",
  /** Synonym for BIGINT. */
  INT8 = "INT8",
  /** Fixed-length string. */
  CHAR = "CHAR",
  /** Variable-length string. */
  VARCHAR = "VARCHAR",
  /** Fixed-length binary byte string. */
  BINARY = "BINARY",
  /** Alias for BINARY. */
  "CHAR BYTE" = "CHAR BYTE",
  /** Variable-length binary byte string. */
  VARBINARY = "VARBINARY",
  /** Tiny binary large object up to 255 bytes. */
  TINYBLOB = "TINYBLOB",
  /** Binary large object up to 65,535 bytes. */
  BLOB = "BLOB",
  /** Medium binary large object up to 16,777,215 bytes. */
  MEDIUMBLOB = "MEDIUMBLOB",
  /** Long BLOB holding up to 4GB. */
  LONGBLOB = "LONGBLOB",
  /** A TEXT column with a maximum length of 255 characters. */
  TINYTEXT = "TINYTEXT",
  /** A TEXT column with a maximum length of 65,535 characters. */
  TEXT = "TEXT",
  /** A TEXT column with a maximum length of 16,777,215 characters. */
  MEDIUMTEXT = "MEDIUMTEXT",
  /** A TEXT column with a maximum length of 4,294,967,295 characters. */
  LONGTEXT = "LONGTEXT",
  /** LONG and LONG VARCHAR are synonyms for MEDIUMTEXT. */
  LONG = "LONG",
  /** LONG and LONG VARCHAR are synonyms for MEDIUMTEXT. */
  "LONG VARCHAR" = "LONG VARCHAR",
  /** For storage of IPv6 addresses. */
  INET6 = "INET6",
  /** Compatibility data type that is an alias for LONGTEXT. */
  JSON = "JSON",
  /** Enumeration, or string object that can have one value chosen from a list of values. */
  ENUM = "ENUM",
  /** Set, or string object that can have 0 or more values chosen from a list of values. */
  SET = "SET",
  /** Data type for stored procedure variables. */
  ROW = "ROW",
  /** The date type YYYY-MM-DD. */
  DATE = "DATE",
  /** Time format HH:MM:SS.ssssss */
  TIME = "TIME",
  /** Date and time combination displayed as YYYY-MM-DD HH:MM:SS. */
  DATETIME = "DATETIME",
  /** YYYY-MM-DD HH:MM:SS */
  TIMESTAMP = "TIMESTAMP",
  /** A four-digit year. */
  YEAR = "YEAR",
}

export default DataTypes;
