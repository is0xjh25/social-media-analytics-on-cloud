class happiness_score:
    def __init__(self, h_dict, whole_words):
        self.words = whole_words
        self.h_dict = {}
        self.total_count = 0
        for w in self.words:
            if w in h_dict:
                self.total_count += 1
                if w not in self.h_dict:
                    self.h_dict[w] = {}
                    self.h_dict[w]["score"] = h_dict[w]
                    self.h_dict[w]["count"] = 1
                else:
                    self.h_dict[w]["count"] += 1

    def scoring(self):
        score = 0
        for w in self.h_dict:
            score += self.h_dict[w]["score"] * self.h_dict[w]["count"]

        return score / self.total_count
