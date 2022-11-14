using System;
using System.Data.Common;
using System.Threading.Tasks;

namespace LFG.Utils;

public static class DbDataReaderExtensions
{
	public static async Task<T?> GetFieldValueOrNullAsync<T>(this DbDataReader reader, int ordinal)
	{
		var obj = await reader.GetFieldValueAsync<object?>(ordinal);
		return obj is null or DBNull ? default : (T)obj;
	}
}
