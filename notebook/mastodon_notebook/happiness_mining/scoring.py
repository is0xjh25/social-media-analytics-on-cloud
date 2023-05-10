from happiness_mining import labMIT1


class happiness_score:
    def __init__(self):
        self.h_dict = labMIT1.info().to_dict()
        self.counted_dict = {}

    def set_whole_words(self, whole_words):
        # Couting
        self.counted_dict = self.counting_words(whole_words)

    def scoring_in_whole(self, tokens):
        if len(self.counted_dict.keys()) > 0:
            # Scoring
            score = 0
            total_count = 0
            for t in tokens:
                if t in self.counted_dict:
                    score += (
                        self.counted_dict[t]["score"] * self.counted_dict[t]["count"]
                    )
                    total_count += self.counted_dict[t]["count"]
            if total_count != 0:
                return score / total_count
        return 0

    def scoring_by_text(self, tokens):
        score = 0
        length = 0
        for t in tokens:
            if t in self.h_dict:
                score += self.h_dict[t]
                length += 1
        if length != 0:
            return score / length
        return 0

    def counting_words(self, whole_words):
        tmp_dict = {}
        for w in whole_words:
            if w in self.h_dict:
                if w not in tmp_dict:
                    tmp_dict[w] = {}
                    tmp_dict[w]["score"] = self.h_dict[w]
                    tmp_dict[w]["count"] = 1
                else:
                    tmp_dict[w]["count"] += 1

        return tmp_dict
