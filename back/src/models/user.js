import sql from '../utils/db.js'
import HttpError from '../utils/httpError.js';

export async function changeStatus(isActive, ids) {
  try {
    await sql`
    UPDATE public.app_user
    SET is_active=${isActive}
    WHERE app_user_id IN ${sql(ids)}`;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteUsers(ids) {
  try {
    await sql`
    DELETE FROM public.app_user
    WHERE app_user_id IN ${sql(ids)}`;

    return true;
  } catch (error) {
    return false;
  }
}

export async function createUser({ email, name, password }) {
  try {
    await sql`
      insert into app_user (email, name, password, is_active, last_changed)
      values (${email}, ${name}, ${password}, true, CURRENT_TIMESTAMP)`
  } catch (error) {
    console.log(error);
    if (error.constraint_name === 'email_lower_idx') {
      throw new HttpError(400, "The user with the same name is already exist.");
    }
    throw new HttpError(500, "Unknow database error.")
  }
}

export async function findUser({ email, password }) {
  try {
    const response = await sql`
      SELECT app_user_id, email, name, is_active, last_changed
      FROM public.app_user
      WHERE email = ${email} AND password = ${password}`;

    return response[0];
  } catch (error) {
    throw new HttpError(500, "Unknow database error.")
  }
}

export async function getAllUsers() {
  try {
    const response = await sql`
    SELECT app_user_id, email, name, is_active, last_changed
    FROM public.app_user`

    return response;
  }
  catch (error) {
    throw new HttpError(500, "Unknow database error.")
  }
}