export const addAlignment = (badgeClass, alignment) => {
  if (alignment.target_name || alignment.target_url || alignment.target_framework || alignment.target_code ) {
    badgeClass.alignment = [alignment];
  }
};
