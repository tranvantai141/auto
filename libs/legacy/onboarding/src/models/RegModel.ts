const empty = /^s*$/;

const assumed_vietnamese_id_length = /^\d{12}$/;

const email =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class RegOptions {
  public static empty = empty;

  public static email = email;

  public static assumed_vietnamese_id_length = assumed_vietnamese_id_length;
}
