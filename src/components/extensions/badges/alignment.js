export const addAlignments = (badgeClass, alignments) => {
  for (const alignment of alignments) {
    if (alignment.target_name || alignment.target_url || alignment.target_framework || alignment.target_code ) {
      badgeClass.alignments.push(alignment);
    }
  }
};
