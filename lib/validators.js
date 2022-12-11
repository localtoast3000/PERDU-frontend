export function emailValidator(value) {
  if (!value) return "Email is required";
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/.test(
      value
    ) ||
    typeof value !== "string"
  )
    return "Invalid email";
  return true;
}

export function passwordValidator(value) {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  if (!value) return "Password is required";
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value
    ) ||
    typeof value !== "string"
  )
    return "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  return true;
}
