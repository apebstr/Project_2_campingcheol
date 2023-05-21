import pandas as pd
from flask import Flask, request

app = Flask(__name__)

#시작 ctrl+F5

# CSV 파일을 불러옵니다.
placeTag = pd.read_csv('C:\java\springboot_workspace\campingcheol\placeTag/tagsheet2.csv', delimiter=',', encoding='cp949', engine='python')

# 캠핑장 간 상관관계 계산 함수
def get_corr():
    # One-hot encoding
    tag_one_hot = pd.get_dummies(placeTag['campTag1'])

    # 각 캠핑장의 One-hot encoding을 하나로 합침
    df_one_hot = pd.concat([placeTag['campKeyNum'], tag_one_hot], axis=1).groupby('campKeyNum').sum()

    # 캠핑장 간 상관관계 계산
    corr = df_one_hot.T.corr()
    return corr

#함수 정의를 통한 일반화
def nearest_campground(campKeyNum, n):
    corr = get_corr()
    return corr.loc[campKeyNum].sort_values(ascending=False)[1:n+1].index.tolist()

@app.route('/')
@app.route('/home')
def home():
    return 'Hello, World!'



@app.route('/rrr')
def user():

    # 불러온 CSV 파일의 상위 5개 행을 반환합니다.
    return placeTag.head().to_html()

@app.route('/rrr222')
def corr_analysis():
    # 캠핑장 간 상관관계를 분석한 결과를 반환합니다.
    corr = get_corr()
    index = corr.index.get_loc(2)
    similarities = corr.iloc[index]
    top_similarities = similarities.sort_values(ascending=False)[1:11].iloc[:10]
    return top_similarities.to_frame().to_html()

@app.route('/camprecommendation')
def nearest_camp():
    campKeyNum = request.args.get('campKeyNum')
    if campKeyNum is not None:
        result = nearest_campground(int(campKeyNum), 10)
        return str(result)
    else:
        return "Invalid input"



if __name__ == '__main__':
    app.run(debug=True)