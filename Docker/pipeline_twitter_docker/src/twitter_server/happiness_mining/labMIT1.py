import pandas as pd
import os


class info:
    def __init__(self):
        self.path = os.path.join(os.getcwd(), "happiness_mining/labMIT1.csv")
        self.h_index = pd.read_csv(self.path)
        # eliminate neutral words
        self.h_index = self.h_index.loc[
            (self.h_index["happiness_average"] >= 5.5)
            | (self.h_index["happiness_average"] <= 4.5)
        ]

    def to_dict(self):
        h_tmp = self.h_index[["#word", "happiness_average"]]
        h_tmp.set_index(keys="#word", inplace=True)
        h_dict = h_tmp.to_dict()["happiness_average"]
        return h_dict

    def to_df(self):
        return self.h_index
