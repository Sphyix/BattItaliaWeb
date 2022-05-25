interface Object {
  assignSafe: typeof functionAssignSafe;
}
function functionAssignSafe<T, U>(target: T, source: U): T | U {
  if (target === null || source === undefined) {
    return target;
  } else {
    return Object.assign(target, source);
  }
}
Object.assignSafe = functionAssignSafe;