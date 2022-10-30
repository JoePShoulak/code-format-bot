const identifyContent = (content, index) => {
  if (index % 2 == 0) {
    return "plain";
  }

  if (content.substring(0, 1) == "\n") {
    return "amb_code";
  }

  return "lang_code";
};

const createSections = async (content) => {
  const sections = [];

  const rawSections = content.split("```");
  rawSections.forEach((content, index) => {
    const type = identifyContent(content, index);

    sections.push({ content, type });
  });

  return sections;
};

module.exports = { createSections };
