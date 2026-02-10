console.log('🟡 页面已加载 - 开始初始化');

// 详细配置信息
const CONFIG = {
    supabaseUrl: 'https://your-project.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIs...',
    rpcFunction: 'lookup_members'
};

console.log('🔧 配置信息:', CONFIG);
console.log('🔧 Supabase URL:', CONFIG.supabaseUrl);
console.log('🔧 函数名称:', CONFIG.rpcFunction);

// 创建Supabase客户端
try {
    const supabase = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.anonKey);
    console.log('✅ Supabase客户端创建成功');
    console.log('📦 Supabase对象:', supabase);
    
    // 测试supabase对象是否有效
    if (supabase && supabase.rpc) {
        console.log('✅ supabase.rpc 函数存在');
    } else {
        console.error('❌ supabase.rpc 函数不存在！');
    }
} catch (error) {
    console.error('❌ 创建Supabase客户端失败:', error);
}

// 添加点击事件监听器
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM已加载完成');
    
    const button = document.querySelector('button');
    if (button) {
        console.log('✅ 找到按钮:', button);
        button.addEventListener('click', function() {
            console.log('🟡 按钮被点击了！');
            testRpc();
        });
    } else {
        console.error('❌ 找不到按钮元素！');
    }
});

// 测试函数
async function testRpc() {
    console.log('🚀 开始调用RPC函数...');
    
    try {
        const supabase = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.anonKey);
        
        // 简单的测试payload
        const payload = { info: 'test123' };
        console.log('📤 发送payload:', payload);
        
        const { data, error } = await supabase.rpc(CONFIG.rpcFunction, payload);
        
        if (error) {
            console.error('❌ RPC调用错误:', error);
            console.error('错误代码:', error.code);
            console.error('错误详情:', error.details);
            console.error('错误提示:', error.hint);
            console.error('完整错误对象:', error);
        } else {
            console.log('✅ RPC调用成功！');
            console.log('📥 返回数据:', data);
        }
        
    } catch (error) {
        console.error('❌ 发生异常:', error);
        console.error('异常堆栈:', error.stack);
    }
}
