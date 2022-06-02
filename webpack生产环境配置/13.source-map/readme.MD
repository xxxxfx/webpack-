# surce-map
提供一种源代码到构建后代码映射技术，如果构建后代码出错，可以通过映射追踪原地啊吗
devtool: 'source-map"
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
source-map 外部
inline-source-map: 内联
hidden-source-map：外部 源代码隐藏
eval-source-map：每一个文件都生成对应的source-map，都在eval
nosources-source-map 外部 全部隐藏
cheap-source-map 外部
精确到行
cheap-module-spurce-map 外部
精确到准确信息
开发环境： 速度快，调试友好  ===》eval-source-map/eval-cheap-module-source-map
速度快（eval>inline > cheap>..）
eval-cheap-source-map
eval-source-map
调试友好
source-map
cheap-module-spurce-map
cheap-spurce-map

生产环境：考虑源代码是否隐藏，调试要不要友好
内联会让体积变得很大
source-map/cheap-module-source-map
# 缓存
babel缓存
