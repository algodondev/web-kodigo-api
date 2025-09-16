/*
  modelos para la api de bootcamps
  */

/**
 * user data for authentication
 * @type {{username: string, password: string}}
 */
export class user {
  constructor() {
    this.username = "";
    this.password = "";
  }
}



/**
 * token data for authentication
 * @type {{Authorization: string}}
 */
export class tokens {
  constructor() {
    this.Authorization = "";
  }
};

/**
 * bootcamps data for authentication
 * @type {{name: string, description: string, technologies: Array}}
 */
export class bootcamps {
  constructor() {
    this.name = "";
    this.description = "";
    this.technologies = [];
  }
}